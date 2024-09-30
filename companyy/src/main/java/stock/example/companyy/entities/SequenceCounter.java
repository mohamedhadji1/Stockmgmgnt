/*package stock.example.companyy.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

@Document(collection = "sequence_counter")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class SequenceCounter {
    @Id
    private String id;
    private int seq;
}*/




package stock.example.companyy.entities;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "sequence")
@Getter
@Setter
public class SequenceCounter {
    @Id
    private String id;
    private int seq;
    public SequenceCounter(String id, int seq) {
        this.id = id;
        this.seq = seq;
    }
}
